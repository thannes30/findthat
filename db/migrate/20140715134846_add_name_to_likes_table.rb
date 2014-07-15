class AddNameToLikesTable < ActiveRecord::Migration
  def change
    add_column :likes, :name, :string
  end
end
