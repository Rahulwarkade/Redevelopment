"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchPosts,
  createPost,
  clearNewPost,
  Post,
  NewPost,
} from "@/store/slices/apiDemoSlice";
import { Container, Text, Button, Input } from "@/components/common";

const ApiDemo = () => {
  const dispatch = useAppDispatch();
  const { posts, newPost, loading, error } = useAppSelector(
    (state) => state.apiDemo
  );

  const [formData, setFormData] = useState<NewPost>({
    title: "",
    body: "",
    userId: 1, // Default user ID
  });

  useEffect(() => {
    // Fetch posts when component mounts
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(createPost(formData));
    // Reset form
    setFormData({
      title: "",
      body: "",
      userId: 1,
    });
  };

  return (
    <Container maxWidth="xl" className="mx-auto p-4">
      <Text variant="h1" size="2xl" weight="bold" className="mb-6">
        API Demo with Redux & Axios
      </Text>

      {/* Create Post Form */}
      <Container
        bgColor="bg-white"
        shadow="md"
        rounded="lg"
        padding="lg"
        className="mb-8"
      >
        <Text variant="h2" size="xl" weight="semibold" className="mb-4">
          Create New Post
        </Text>
        <form onSubmit={handleSubmit}>
          <Container className="mb-4">
            <Input
              label="Title"
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              variant="outlined"
              inputSize="md"
              required
            />
          </Container>

          <Container className="mb-4">
            <label
              htmlFor="body"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Content
            </label>
            <textarea
              id="body"
              name="body"
              value={formData.body}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              aria-label="Content"
              placeholder="Enter content here"
            />
          </Container>

          <Button type="submit" disabled={loading} variant="primary" size="md">
            {loading ? "Submitting..." : "Create Post"}
          </Button>
        </form>

        {/* Show success message when post is created */}
        {newPost && (
          <Container className="mt-4 p-3 bg-green-100 rounded-md">
            <Text variant="p" weight="medium" color="text-green-700">
              Post created successfully!
            </Text>
            <Text variant="p" color="text-green-700">
              Title: {newPost.title}
            </Text>
            <Button
              onClick={() => dispatch(clearNewPost())}
              variant="link"
              size="sm"
              className="mt-2"
            >
              Dismiss
            </Button>
          </Container>
        )}

        {/* Show error if any */}
        {error && (
          <Container className="mt-4 p-3 bg-red-100 rounded-md">
            <Text variant="p" color="text-red-700">
              Error: {error}
            </Text>
          </Container>
        )}
      </Container>

      {/* Posts List */}
      <Container bgColor="bg-white" shadow="md" rounded="lg" padding="lg">
        <Text variant="h2" size="xl" weight="semibold" className="mb-4">
          Posts from API
        </Text>

        {loading && posts.length === 0 ? (
          <Text variant="p" color="text-gray-500">
            Loading posts...
          </Text>
        ) : posts.length > 0 ? (
          <Container className="space-y-4">
            {posts.map((post: Post) => (
              <Container key={post.id} className="border-b pb-4">
                <Text variant="h3" size="lg" weight="medium">
                  {post.title}
                </Text>
                <Text variant="p" color="text-gray-600" className="mt-1">
                  {post.body}
                </Text>
                <Text
                  variant="p"
                  size="sm"
                  color="text-gray-500"
                  className="mt-2"
                >
                  Post ID: {post.id}
                </Text>
              </Container>
            ))}
          </Container>
        ) : (
          <Text variant="p" color="text-gray-500">
            No posts found.
          </Text>
        )}

        {/* Refresh button */}
        <Button
          onClick={() => dispatch(fetchPosts())}
          disabled={loading}
          variant="secondary"
          size="md"
          className="mt-4"
        >
          {loading ? "Refreshing..." : "Refresh Posts"}
        </Button>
      </Container>
    </Container>
  );
};

export default ApiDemo;
