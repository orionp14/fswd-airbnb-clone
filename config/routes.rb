Rails.application.routes.draw do
  root to: 'static_pages#home'

  namespace :api do
    # Add routes below this line
    resources :users, only: [:create]
    resources :sessions, only: [:create, :destroy]
    resources :properties, only: [:index, :show, :create]
    resources :bookings, only: [:create]
    resources :charges, only: [:create]

    get '/properties/:id/bookings' => 'bookings#get_property_bookings'
    get '/authenticated' => 'sessions#authenticated'
    get '/booking/:id/success' => 'bookings#success', as: :booking_success

    # stripe webhook
    post '/charges/mark_complete' => 'charges#mark_complete'
  end

  # Static page routes
  get '/property/:id' => 'static_pages#property'
  get '/login' => 'static_pages#login'
  get '/bookings' => 'static_pages#bookings'
  get '/host' => 'static_pages#host'
end
