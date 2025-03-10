import {RouteProps} from "react-router-dom"
import PostsListPage from "./pages/posts/PostsListPage"
import ProductsListPage from "./pages/products/ProductsListPage"
import StoriesListPage from "./pages/stories/StoriesListPage"
import HastagsListPage from "./pages/hashtags/HashtagsListPage"

export const AppRoutes = {
  posts: "/posts",
  products: "/products",
  stories: "/stories",
  hashtags: "/hashtags",
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
  [AppRoutes.hashtags]: {
    path: AppRoutes.hashtags,
    element: <HastagsListPage />,
  },
}

export const AppRoutePageNames = {
  [AppRoutes.posts]: "Посты",
  [AppRoutes.products]: "Продукты",
  [AppRoutes.stories]: "Истории",
  [AppRoutes.hashtags]: "Хештеги",
}
