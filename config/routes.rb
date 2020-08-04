Rails.application.routes.draw do
  devise_for :users
  root to: 'tweets#index'
  resources :tweets do
    resources :comments, only: :create
    collection do
      get 'search'
    end
    get 'api_messages_path' => 'api/messages#index'
  # resources :api_messages_path do
    # resources :messages, only: :index, defaults: { format: 'json' }
  # end
  end
end