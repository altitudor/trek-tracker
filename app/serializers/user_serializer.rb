class UserSerializer < ActiveModel::Serializer
  attributes :id, :user_name, :admin, :email, :profile_photo, :notes
end
