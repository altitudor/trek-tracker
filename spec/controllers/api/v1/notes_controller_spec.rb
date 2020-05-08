require "rails_helper"

RSpec.describe Api::V1::NotesController, type: :controller do

  describe "POST#new" do
    let!(:trail1) { Trail.create(
        name: "trail1")
    }

    let!(:user1) { User.create(
      email: "email@email.com",
      user_name: "user1",
      password: "password")
    }

    let!(:new_note) { { trail_id: trail1.id, note: {
      note: "Lovely trail!",
      user_id: user1.id,
      trail_id: trail1.id
    } } }

    it "creates a new note record" do
      previous_count = Note.count
      post :create, params: new_note, format: :json
      new_count = Note.count

      expect(new_count).to eq(previous_count + 1)
    end

    it "returns the new note as json" do
      post :create, params: new_note, format: :json
      response_body = JSON.parse(response.body)

      expect(response_body["note"].length).to eq 7
      expect(response_body["note"]["note"]).to eq "Great trail!"
    end
  end
end
