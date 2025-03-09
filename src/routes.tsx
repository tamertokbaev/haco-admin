import {RouteProps} from "react-router-dom"
import PostsListPage from "./pages/posts/PostsListPage"
import ProductsListPage from "./pages/products/ProductsListPage"
import StoriesListPage from "./pages/stories/StoriesListPage"

export const AppRoutes = {
  posts: "/posts",
  products: "/products",
  stories: "/stories",
}

export const RouteConfig: Record<string, RouteProps> = {
  [AppRoutes.posts]: {
    path: AppRoutes.posts,
    element: <PostsListPage />,
  },
  [AppRoutes.products]: {
    path: AppRoutes.products,
    element: <ProductsListPage />,
  },
  [AppRoutes.stories]: {
    path: AppRoutes.stories,
    element: <StoriesListPage />,
  },
}

export const AppRoutePageNames = {
  [AppRoutes.posts]: "Posts",
  [AppRoutes.products]: "Products",
  [AppRoutes.stories]: "Stories",
}
