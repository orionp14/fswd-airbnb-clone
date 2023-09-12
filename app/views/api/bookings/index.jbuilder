json.bookings do
  json.array! @bookings do |booking|
    json.id booking.id
    json.start_date booking.start_date
    json.end_date booking.end_date

    json.property do
      json.id booking.property.id
      json.title booking.property.title
      json.description booking.property.description
      json.city booking.property.city
      json.image_url url_for(booking.property.image) if booking.property.image.attached?
    end
  end
end
