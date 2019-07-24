class EventsController < ApplicationController
  # before_action :set_event, only: [:show, :update, :destroy]

  def index
    events = Event.all
    render json: events, include: [:organisation, :student]
  end

  def show
    event = Event.find(params[:id])
    render json: event, include: [:organisation, :student]
  end

  def create
    event = Event.new(event_params)
    if event.save
      render json: event, include: [:organisation, :student]
    else
      render json: event.errors
    end
  end

  def update
    event = Event.find(params[:id])
    if event.update(event_params)
      render json: event, include: [:organisation, :student]
    else
      render json: event.errors
    end
  end

  def destroy
    event = Event.find(params[:id])
    event.destroy
  end

  private

    def event_params
      params.require(:event).permit(:title, :date, :location, :dress_code, :student_id, :organisation_id, :speakers, :contact_email, :category, :tags)
    end
    
end
