class CreateTips < ActiveRecord::Migration
  def change
    create_table :tips do |t|
      t.string :message
      t.integer :user_id
      t.integer :venue_id

      t.timestamps
    end
  end
end
