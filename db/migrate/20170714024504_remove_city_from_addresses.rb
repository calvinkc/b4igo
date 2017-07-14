class RemoveCityFromAddresses < ActiveRecord::Migration[5.1]
  def change
    remove_column :addresses, :city, :string
  end
end
