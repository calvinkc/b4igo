
json.id @user.id
json.firstname @user.firstname
json.lastname @user.lastname
json.email @user.email
json.addresses @user.addresses do |address|
    json.street address.street
    json.city address.city
    json.state address.state
    json.label address.label
end
