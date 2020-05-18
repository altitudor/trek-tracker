class CreateCompletedTrails < ActiveRecord::Migration[5.2]
  def change
    create_table :completed_trails do |t|
      t.integer :api_id, null: false

      t.belongs_to :user, null: false

      t.timestamps
    end
  end
end
