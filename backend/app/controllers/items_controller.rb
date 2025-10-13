class ItemsController < ApplicationController
  skip_before_action :verify_authenticity_token
  
  def index
    @items = Item.all
    render json: @items.map { |item| item_json(item) }
  end

  def show
    @item = Item.find(params[:id])
    render json: item_json(@item)
  end

  def create
    @item = Item.new(item_params)
    if @item.save
      render json: item_json(@item), status: :created
    else
      render json: @item.errors, status: :unprocessable_entity
    end
  end

  def update
    @item = Item.find(params[:id])
    if @item.update(item_params)
      render json: item_json(@item)
    else
      render json: @item.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @item = Item.find(params[:id])
    @item.destroy
    head :no_content
  end

  private

  def item_params
    params.require(:item).permit(:name, :description, :price, :image)
  end

def item_json(item)
  if item.image.attached?
    { 
      id: item.id,
      name: item.name,
      description: item.description,
      price: item.price,
      image_url: url_for(item.image)
    }
  else
    { 
      id: item.id,
      name: item.name,
      description: item.description,
      price: item.price
    }
  end
end

end

