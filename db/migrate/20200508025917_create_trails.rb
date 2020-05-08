class CreateTrails < ActiveRecord::Migration[5.2]
  def change
    create_table :trails do |t|
      t.string :name, null: false
      t.float :distance
      t.integer :ascent
      t.text :description

      t.timestamps
    end

    add_index :trails, :name, unique: true
  end
end
