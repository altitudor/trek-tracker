class CreateNotes < ActiveRecord::Migration[5.2]
  def change
    create_table :notes do |t|
      t.text :note, null: false
      t.string :hike_date

      t.belongs_to :user, null: false
      t.belongs_to :trail, null: false

      t.timestamps
    end
  end
end
