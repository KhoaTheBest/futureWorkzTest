class Api::V1::JokesController < ApplicationController
    before_action :set_current_joke, only: [:update]
    skip_before_action :verify_authenticity_token
    respond_to :json

    def get_next_joke
        @joke = if joke_params[:read_jokes].nil? || joke_params[:read_jokes].empty?
                    Joke.take
                else
                    Joke.where.not(id: joke_params[:read_jokes].split(',')).take
                end

        if @joke.nil?
            render json: {
                joke: {
                    id: nil,
                    content: t('joke.done')
                }
            }
        else
            render json: {
                joke: {
                    id: @joke.id,
                    content: @joke.joke_content
                }
            }
        end
    end

    def update
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
        params.require(:joke).permit(:doAction, :read_jokes)
    end
end
