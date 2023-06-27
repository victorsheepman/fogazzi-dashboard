import { 
    Refine,
    GitHubBanner, 
    WelcomePage,
    Authenticated
,AuthBindings, 
} from '@refinedev/core';
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import { AuthPage,ErrorComponent
,notificationProvider
,ThemedLayoutV2
,ThemedSiderV2} from '@refinedev/antd';
import "@refinedev/antd/dist/reset.css";

import dataProvider from "@refinedev/simple-rest";
import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import routerBindings, { NavigateToResource, CatchAllNavigate, UnsavedChangesNotifier, DocumentTitleHandler } from "@refinedev/react-router-v6";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { BlogPostList, BlogPostCreate, BlogPostEdit, BlogPostShow } from "./pages/blog-posts";

import { ColorModeContextProvider } from "./contexts/color-mode";
import { Header } from "./components/header";
import { Login } from "./pages/login";


function App() {
    const { isLoading, user, logout, getIdTokenClaims } = useAuth0();

    
            if (isLoading) {
                return <span>loading...</span>
            }

            const authProvider: AuthBindings = {
                login: async () => {
                    return {
                        success: true,
                    };
                },
                logout: async () => {
                    logout({ returnTo: window.location.origin });
                    return {
                        success: true,
                    };
                },
                onError: async (error) => {
                    console.error(error);
                    return { error };
                },
                check: async () => {
                    try {
                        const token = await getIdTokenClaims();
                        if (token) {
                            axios.defaults.headers.common = {
Authorization: `Bearer ${token.__raw}`

                            };
                            return {
                                authenticated: true,
                            };
                        } else {
                            return {
                                authenticated: false,
                                error: {
                                    message: "Check failed",
                                    name: "Token not found",
                                },
                                redirectTo: "/login",
                                logout: true,
                            };
                        }
                    } catch (error: any) {
                        return {
                            authenticated: false,
                            error: new Error(error),
                            redirectTo: "/login",
                            logout: true,
                        };
                    }
                },
                getPermissions: async () => null,
                getIdentity: async () => {
                    if (user) {
                        return {
                            ...user,
                            avatar: user.picture,
                        };
                    }
                    return null;
                },
            };
            
    
    return (
        <BrowserRouter>
        <RefineKbarProvider>
            <ColorModeContextProvider>
            <Refine dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
                    notificationProvider={notificationProvider}
                    routerProvider={routerBindings}
                    authProvider={authProvider} 
                    resources={[
                        {
                            name: "blog_posts",
                            list: "/blog-posts",
                            create: "/blog-posts/create",
                            edit: "/blog-posts/edit/:id",
                            show: "/blog-posts/show/:id",
                            meta: {
                                canDelete: true,
                            },
                        },
                        
                    ]}
                options={{
                    syncWithLocation: true,
                    warnWhenUnsavedChanges: true,
                }}
            >
                <Routes>
                    <Route
                        element={
                            <Authenticated
                                fallback={<CatchAllNavigate to="/login" />}
                            >
                                    <ThemedLayoutV2
                                        Header={() => <Header sticky />}
                                        Sider={(props) => <ThemedSiderV2 {...props} fixed />}
                                    >
                                        <Outlet />
                                    </ThemedLayoutV2>
                            </Authenticated>
                        }
                    >
                        <Route index element={
                                <NavigateToResource resource="blog_posts" />
                        } />
                        <Route path="/blog-posts">
                            <Route index element={<BlogPostList />} />
                            <Route path="create" element={<BlogPostCreate />} />
                            <Route path="edit/:id" element={<BlogPostEdit />} />
                            <Route path="show/:id" element={<BlogPostShow />} />
                        </Route>
                       
                        <Route path="*" element={<ErrorComponent />} />
                    </Route>
                    <Route
                        element={
                            <Authenticated fallback={<Outlet />}>
                                <NavigateToResource />
                            </Authenticated>
                        }
                    >
                            <Route path="/login" element={<Login />}  />
                    </Route>
                </Routes>


                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
            </Refine>
            </ColorModeContextProvider>
        </RefineKbarProvider>
        </BrowserRouter>
      );
};

export default App;
