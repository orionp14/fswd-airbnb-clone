class ApplicationController < ActionController::Base
    helper_method :current_user
  
    private
  
    def current_user
      @current_user ||= find_current_user
    end
  
    def find_current_user
      return unless cookies.signed[:airbnb_session_token]
  
      session = Session.find_by(token: cookies.signed[:airbnb_session_token])
      session&.user
    end
  end
