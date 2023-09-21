module Api
  class BookingsController < ApplicationController
    def create
      token = cookies.signed[:airbnb_session_token]
      session = Session.find_by(token: token)
      return render json: { error: 'user not logged in' }, status: :unauthorized unless session

      property = Property.find_by(id: params[:booking][:property_id])
      return render json: { error: 'cannot find property' }, status: :not_found unless property

      begin
        @booking = Booking.create(user_id: session.user.id, property_id: property.id, start_date: params[:booking][:start_date], end_date: params[:booking][:end_date])
        render 'api/bookings/create', status: :created
      rescue ArgumentError => e
        render json: { error: e.message }, status: :bad_request
      end
    end

    def get_property_bookings
      property = Property.find_by(id: params[:id])
      return render json: { error: 'cannot find property' }, status: :not_found unless property
    
      @bookings = property.bookings.where('end_date > ? ', Date.today)
      property_data = {
        id: property.id,
        title: property.title,
        price_per_night: property.price_per_night,
      }
      render json: { property: property_data, bookings: @bookings }, status: :ok
    end

    def get_user_bookings
      token = cookies.signed[:airbnb_session_token]
      session = Session.find_by(token: token)
      return render json: { error: 'user not logged in' }, status: :unauthorized unless session

      user = session.user
      @bookings = user.bookings.includes(:property)
      render 'api/bookings/index'
    end

    def user_property_bookings
      token = cookies.signed[:airbnb_session_token]
      session = Session.find_by(token: token)
      return render json: { error: 'user not logged in' }, status: :unauthorized unless session
    
      user = session.user
    
      # Fetch bookings for properties owned by the user
      @bookings = Booking.joins(:property).where(properties: { user_id: user.id }).where('end_date > ?', Date.today)
    
      render 'api/bookings/index'
    end

    def by_session
      session_id = params[:session_id]
      booking = Booking.find_by(checkout_session_id: session_id)
    
      if booking
        property_data = {
          title: booking.property.title,
          start_date: booking.start_date.to_s,
          end_date: booking.end_date.to_s,
          total_price: booking.total_price
        }
    
        render json: property_data, status: :ok
      else
        render json: { error: 'Booking not found' }, status: :not_found
      end
    end

    private

    def booking_params
      params.require(:booking).permit(:property_id, :start_date, :end_date)
    end
  end
end