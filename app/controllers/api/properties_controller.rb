module Api
  class PropertiesController < ApplicationController
    def index
      @properties = Property.order(created_at: :desc).page(params[:page]).per(6)
      return render json: { error: 'not_found' }, status: :not_found unless @properties

      render 'api/properties/index', status: :ok
    end

    def show
      @property = Property.find_by(id: params[:id])
      return render json: { error: 'not_found' }, status: :not_found unless @property

      render 'api/properties/show', status: :ok
    end

    def create
      @property = current_user.properties.new(property_params)
    
      if @property.save!
        render 'api/properties/show', status: :created
      else
        render json: { errors: @property.errors.full_messages }, status: :unprocessable_entity
      end
    end

    def update
      @property = Property.find_by(id: params[:id])
    
      unless @property
        return render json: { error: 'not_found' }, status: :not_found
      end
    
      if @property.update(property_params)
        render 'api/properties/show', status: :ok
      else
        render json: { errors: @property.errors.full_messages }, status: :unprocessable_entity
      end
    end
    

    private

    def property_params
      params.require(:property).permit(:title, :description, :city, :country, :property_type, :price_per_night, :max_guests, :bedrooms, :beds, :baths, :image)
    end
  end
end