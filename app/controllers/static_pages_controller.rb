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

  def host
    render 'host'
  end

  def booking_success
    @property_title = params[:property_title]
    @start_date = params[:start_date]
    @end_date = params[:end_date]
    @unit_amount = params[:unit_amount]
  end
end