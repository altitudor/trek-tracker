class CreateFavorites < ActiveRecord::Migration[5.2]
  def change
    create_table :favorites do |t|
      t.integer :api_id, null: false
      t.boolean :completed, default: false, null: false

      t.belongs_to :user, null: false

      t.timestamps
    end
  end
end
