class ChangeVenuesToCheckIns < ActiveRecord::Migration
  def change
    rename_table :venues, :checkins
  end
end
