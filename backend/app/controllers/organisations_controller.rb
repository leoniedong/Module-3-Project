class OrganisationsController < ApplicationController
  # before_action :set_organisation, only: [:show, :update, :destroy]
  # has_secure_password


  def login
    org = Organisation.find_by(email:params[:email])
    if org
      render json: org
    else
      render json: {error: "LOG IN UNSUCCESSFUL", status: 401}
    end
  end


  def index
    organisations = Organisation.all
    render json: organisations, include: [:events]
  end

  def show
    organisation = Organisation.find(params[:id])
    render json: organisation, include: [:events]
  end

  def create
    organisation = Organisation.new(organisation_params)
    if organisation.save
      render json: organisation, include: [:events]
    else
      render json: {"error": orgnanisation.errors.full_messages}
    end
  end

  def update
    organisation = Organisation.find(params[:id])
    if organisation.update(organisation_params)
      render json: organisation, include: [:events]
    else
      render json: {"error": organisation.errors.full_messages}
    end
  end

  def destroy
    organisation = Organisation.find(params[:id])
    organisation.destroy
  end

  private

  def organisation_params
    params.require(:organisation).permit(:email, :name, :description)
  end



end
