json.array! @users.each do |user|
  json.id user.id
  json.firstname user.firstname
  json.lastname user.lastname
  json.email user.email
  json.addresses user.addresses do |address|
      json.location address.location
      json.label address.label
  end
end