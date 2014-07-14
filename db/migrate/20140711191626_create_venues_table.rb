class CreateVenuesTable < ActiveRecord::Migration
  def change
    create_table :venues do |t|
      t.integer :venue_id
      t.integer :user_id

      t.timestamps
    end
  end
end
