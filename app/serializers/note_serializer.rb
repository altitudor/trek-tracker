class NoteSerializer < ActiveModel::Serializer
  attributes :id, :note, :user_id, :user_name

  belongs_to :trail

  def user_name
    object.user.user_name
  end
end
