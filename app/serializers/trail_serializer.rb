class TrailSerializer < ActiveModel::Serializer
  attributes :id, :name, :notes, :user

  def user
    if scope
      {id: scope.id, userName: scope.user_name, admin: scope.admin}
    else
      {id: nil, userName: nil, admin: nil}
    end
  end

  has_many :notes
end
