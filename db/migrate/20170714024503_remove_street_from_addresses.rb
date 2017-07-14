class RemoveStreetFromAddresses < ActiveRecord::Migration[5.1]
  def change
    remove_column :addresses, :street, :string
  end
end
