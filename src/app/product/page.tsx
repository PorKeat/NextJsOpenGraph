'use client';
import ProductCard from '@/components/product/ProductCard';
import React from 'react'
import { useGetProductsQuery } from '@/lib/api/productsApi';
import { ProductType } from '@/types/productType';
import Loading from '../loading';
import Link from 'next/link';


export default function ProductPage() {

  // Using RTK Query to fetch products
  const { data, isLoading, error } = useGetProductsQuery();
  if (isLoading) return <Loading/>;
  if (error) return <p className='text-red-500 text-center'>Failed to load products</p>;
  const products = data as ProductType[];

  return (
    <section className='w-[90%] mx-auto mb-10 mt-20'>
      <div className='flex items-center justify-between mb-5'>
        <h2 className='font-bold text-[24px] text-blue-500 uppercase'>Product Page</h2>
        <Link href={`/product/action`} className='text-white bg-blue-500 p-3 rounded-2xl'>
          Go to Action Page
        </Link>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4'>
        {
          products.map((product: ProductType) => (
              <ProductCard
                product={product}
                key={product.id}
              />
          ))
        }
      </div>
    </section>
  )
}
