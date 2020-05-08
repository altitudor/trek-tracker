require "rails_helper"

RSpec.describe Api::V1::TrailsController, type: :controller do
  describe "GET#index" do
    let!(:trail1) { Trail.create(
      name: "trail1")
    }

    let!(:trail2) { Trail.create(
      name: "trail2")
    }

    it "returns a successful response status and a content type of json" do
      get :index

      expect(response.status).to eq 200
      expect(response.content_type).to eq 'application/json'
    end

    it "returns all trails in the database" do
      get :index
      response_body = JSON.parse(response.body)

      expect(response_body.length).to eq 1
      expect(response_body["trails"][0]["name"]).to eq trail1.name

      expect(response_body["trails"][1]["name"]).to eq trail2.name
    end
  end

  describe "GET#show" do
    let!(:trail1) { Trail.create(
      name: "trail1")
    }

    let!(:trail2) { Trail.create(
      name: "trail2")
    }

    let!(:user3) { User.create!(
      email: "test3@email.com",
      password: "testing3",
      user_name: "test_user3")
    }

    let!(:user4) { User.create!(
      email: "test4@email.com",
      password: "testing4",
      user_name: "test_user4")
    }

    let!(:note1) { Note.create(
        note: "so good!",
        trail: trail1,
        user: user3)
    }

    let!(:note2) { Note.create(
        note: "so bad!",
        trail: trail2,
        user: user3)
    }

    it "returns a successful response status and a content type of json" do
      get :show, params: {id: trail1.id}

      expect(response.status).to eq 200
      expect(response.content_type).to eq 'application/json'
    end

    it "if the user is logged in returns information on the user and the specified trail" do
      sign_in user3
      get :show, params: {id: trail1.id}
      response_body = JSON.parse(response.body)

      expect(response_body.length).to eq 1

      expect(response_body["trail"]["name"]).to eq trail1.name
      expect(response_body["trail"]["user"]["userName"]).to eq "test_user3"
      expect(response_body["trail"]["user"]["admin"]).to eq false
      expect(response_body["trail"]["notes"][0]["note"]).to eq note1.note

      expect(response_body["trail"]["name"]).to_not eq trail2.name
      expect(response_body["trail"]["user"]["userName"]).to_not eq "test_user4"
      expect(response_body["trail"]["notes"][0]["note"]).to_not eq note2.note
    end

    it "if the user is not logged in returns information of the specified trail and not user" do
      get :show, params: {id: trail1.id}
      response_body = JSON.parse(response.body)

      expect(response_body.length).to eq 1

      expect(response_body["trail"]["name"]).to eq trail1.name
      expect(response_body["trail"]["user"]["userName"]).to eq nil
      expect(response_body["trail"]["user"]["admin"]).to eq nil

      expect(response_body["trail"]["name"]).to_not eq trail2.name
      expect(response_body["trail"]["notes"][0]["note"]).to_not eq note2.note
    end
  end

  describe "POST#new" do
    let!(:new_trail_hash) { { trail: { name: "John's trail" } } }
    let!(:user) { User.create!(email: "test@email.com", password: "testing", user_name: "test_user") }

    it "fails to create a new Trail record for an unauthenticated user" do
      previous_count = Trail.count
      post :create, params: new_trail_hash, format: :json
      new_count = Trail.count

      expect(new_count).to eq(previous_count)
    end

    it "creates a new Trail record for an authenticated user and returns the new Trail as json" do
      sign_in user
      previous_count = Trail.count
      post :create, params: new_trail_hash, format: :json
      response_body = JSON.parse(response.body)
      new_count = Trail.count

      expect(new_count).to eq(previous_count + 1)
      expect(response_body["trail"].length).to eq 5
      expect(response_body["trail"]["name"]).to eq "John's trail"
    end

    context "when a malformed request is made" do
      let!(:bad_trail_hash_1) { { trail: { } } }
      let!(:bad_trail_hash_2) { { trail: { name: "Reply All" } } }
      let!(:bad_trail_hash_3) { { trail: { name: "Reply All" } } }
      let!(:bad_trail_hash_4) { { trail: { name: "Reply All" } } }
      let!(:bad_trail_hash_5) { { trail: { name: "" } } }

      it "does not create a new trail and return error if trail name is not provided" do
        sign_in user
        previous_count = Trail.count
        post :create, params: bad_trail_hash_1, format: :json
        new_count = Trail.count
        response_body = JSON.parse(response.body)

        expect(new_count).to eq previous_count
        expect(response_body["error"][0]).to eq "Name can't be blank"
      end

      it "returns an error if name is blank" do
        sign_in user
        post :create, params: bad_trail_hash_5, format: :json
        response_body = JSON.parse(response.body)

        expect(response_body["error"][0]).to eq "Name can't be blank"
      end
    end
  end

  describe '#destroy' do
    let! (:trail) { Trail.create(name: "John's trail") }
    let! (:user) { User.create(
      first_name: "John",
      last_name:"Smith",
      email: "test@gmail.com",
      password: "password",
      user_name: "testuser",
      admin: true
    ) }

    it 'removes trail from table' do
      sign_in user
      count = Trail.count
      delete :destroy, params: { id: trail.id }

      expect(Trail.count).to eq(count - 1)
    end
  end
end
