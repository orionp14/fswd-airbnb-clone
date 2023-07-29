class StaticPagesController < ApplicationController
  def home
    render 'home'
  end

  def property
    @data = { property_id: params[:id] }.to_json
    render 'property'
  end

  def login
    render 'login'
  end

  def bookings
    render 'bookings'
  end

  def success
    @booking = Booking.find_by(id: params[:id])
    return if @booking&.charge&.complete

    flash[:error] = 'Booking not found or not completed yet.'
    redirect_to root_path
  end
end