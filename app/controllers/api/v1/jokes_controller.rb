class Api::V1::JokesController < ApplicationController
    before_action :set_current_joke, only: [:update]
    respond_to :json

    def get_next_joke
        @joke = Joke.find_by! status: 0
        render json: {
            id: @joke.id,
            content: @joke.joke_content
        }
    end

    def update
        @current_joke.status = 1

        if joke_params[:doAction] == 0
            @current_joke.no_of_dislike += 1
        elsif joke_params[:doAction] == 1
            @current_joke.no_of_like += 1
        end

        @current_joke.save!

        render json: {
          msg: t('joke.update.success')
        }, status: :ok
    end

    private

    def set_current_joke
        @current_joke = Joke.find(params[:id])
        service_unavailable if @current_joke.nil?
    end

    def service_unavailable
        render nothing: true, status: :service_unavailable
    end

    def joke_params
        params.require(:joke).permit(:doAction)
    end
end
