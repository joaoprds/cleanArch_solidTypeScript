import { Product } from "../../domain/product/entity/product";
import { ProductGateway } from "../../domain/product/gateway/product.gateway";
import { Usecase } from "../usecase";

export type CreateProductInputDto = {
  name: string;
  price: number;
};

export type CreateProducOutputDto = {
  id: string;
};

export class CreateProductUsecase
  implements Usecase<CreateProductInputDto, CreateProducOutputDto>
{
  private constructor(private readonly productGateway: ProductGateway) {}

  public static create(productGateway: ProductGateway) {
    return new CreateProductUsecase(productGateway);
  }

  public async execute({
    name,
    price,
  }: CreateProductInputDto): Promise<CreateProducOutputDto> {
    const aProduct = Product.create(name, price);

    await this.productGateway.save(aProduct);

    const output = this.presentOutput(aProduct);

    return output;
  }

  private presentOutput(product: Product): CreateProducOutputDto {
    const output: CreateProducOutputDto = {
      id: product.id,
    };

    return output;
  }
}
