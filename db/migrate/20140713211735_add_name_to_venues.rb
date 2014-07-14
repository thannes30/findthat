class AddNameToVenues < ActiveRecord::Migration
  def change
    add_column :venues, :name, :string
  end
end
