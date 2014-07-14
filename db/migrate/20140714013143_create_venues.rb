class CreateVenues < ActiveRecord::Migration
  def change
    create_table :venues do |t|
      t.string :foursquare_venue_id

      t.timestamps
    end
  end
end
