import { GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import ProductCategoryView from '@/sections/product/product-view';

// Define the types for your page props
interface ProductPageProps {
  category: string;
  // Add any other props your page might need, e.g., the list of products
}

// Define the dynamic route parameter types
interface Params extends ParsedUrlQuery {
  category: string;
}

// Implement getStaticPaths to define all possible dynamic routes
export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const categories = ['drinks', 'snacks', 'groceries']; // Replace with actual categories fetched from your backend if necessary

  const paths = categories.map((category) => ({
    params: { category },
  }));

  return {
    paths,
    fallback: false, // If false, then any paths not returned by getStaticPaths will result in a 404 page
  };
};

// Implement getStaticProps to fetch data for each page based on the category
export const getStaticProps: GetStaticProps<ProductPageProps, Params> = async ({ params }) => {
  const category = params?.category ?? '';

  // Fetch products or other data based on the category
  // const products = await fetchProductsByCategory(category);

  return {
    props: {
      category,
      // products, // Pass any additional props required by your component
    },
  };
};

// Update the page component to receive the props
export default function ProductPage({ category }: ProductPageProps) {
  return <ProductCategoryView />;
}




// import { Metadata } from 'next';
// import ProductCategoryView from '@/sections/product/product-view';

// export const metadata: Metadata = {
//   title: 'Drinks',
// };

// // Define the possible category paths to pre-generate
// export async function generateStaticParams() {
//   const categories = ["wine", "beer", "whiskey"]; // Static example

//   return categories.map((category) => ({
//     category: category.toLowerCase(), // Ensure consistency
//   }));
// }

// export default function ProductPage() {
//   return <ProductCategoryView />;
// }
