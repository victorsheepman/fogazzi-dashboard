import { IResourceComponentsProps, useShow } from "@refinedev/core";
import { IPost } from "../../../interfaces";
import { Descriptions, Spin } from "antd";
import { Description } from "../components/Description";


export const BlogPostShow: React.FC<IResourceComponentsProps> = () => {
    const { queryResult } = useShow<IPost>();
    const { data, isLoading, isError } = queryResult;
    const post = data?.data

    
    if (isLoading) {
        return <Spin />
    }

    return (
        <Description title={post?.title} status={post?.status} id={post?.id} />
    )

};
