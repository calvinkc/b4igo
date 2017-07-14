class AddLocationToAddresses < ActiveRecord::Migration[5.1]
  def change
    add_column :addresses, :location, :string
  end
end
