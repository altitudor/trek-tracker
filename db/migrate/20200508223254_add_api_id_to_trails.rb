class AddApiIdToTrails < ActiveRecord::Migration[5.2]
  def change
    add_column :trails, :api_id, :integer
  end
end
