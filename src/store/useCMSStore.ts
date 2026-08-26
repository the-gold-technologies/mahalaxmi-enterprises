import { create } from "zustand";

export interface NavLink {
  title: string;
  link: string;
  desc?: string;
  type?: string;
  dropdown?: NavLink[];
}

export interface ApiNavLink {
  id: string;
  label: string;
  url: string;
  type: string;
  parent: string;
  order: number;
  description: string | null;
  title: string | null;
  isStatic: boolean;
}

export interface GlobalSEO {
  id?: string;
  siteTitle?: string;
  siteDescription?: string;
  favicon?: string;
  logo?: string;
  phone?: string;
  email?: string;
  address?: string;
  googleAnalyticsId?: string | null;
  gtmId?: string | null;
  searchConsoleId?: string | null;
  socialLinks?: {
    youtube?: string;
    facebook?: string;
    linkedin?: string;
    instagram?: string;
    twitter?: string;
  };
  robotsTxt?: string | null;
  schema?: string | null;
}

export interface OfficeLocation {
  id: string;
  name: string;
  type?: string;
  address: string;
  phone?: string;
  email?: string;
  contactPerson?: string;
  mapUrl?: string | null;
  order?: number;
}

export interface CMSProduct {
  id: string;
  name: string;
  slug: string;
  categorySlug: string;
  subCategoryTitle?: string;
  tagline?: string;
  description?: string;
  coverImage?: string;
  productImages?: string[];
  pdfUrl?: string;
  tdsPdfUrl?: string;
  msdsPdfUrl?: string;
  applications?: string[];
  performanceBenefits?: string[];
  propertiesTable?: Array<{
    property: string;
    value?: string;
    values?: string[];
  }>;
  tableHeaders?: string[];
  order?: number;
  isFeatured?: boolean;
}

export interface CMSProductCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  order?: number;
  bannerImage?: string;
}

export interface CMSBlogPost {
  id: string;
  title: string;
  slug: string;
  category?: string;
  publishDate?: string;
  readTime?: string;
  author?: string;
  excerpt?: string;
  coverImage?: string;
  content?: {
    intro?: string;
    sections?: Array<{
      heading: string;
      paragraphs?: string[];
      bulletPoints?: string[];
    }>;
    conclusion?: string;
  } | string;
  recommendedProducts?: string[];
  isPublished?: boolean;
  createdAt?: string;
}

export interface CMSEventItem {
  id: string | number;
  title?: string;
  image: string;
  altText?: string;
  date?: string;
  category?: string;
  description?: string;
}

interface CMSStoreState {
  pages: Record<string, any>;
  isLoading: Record<string, boolean>;
  errors: Record<string, string | null>;
  navLinks: NavLink[] | null;
  globalSEO: GlobalSEO | null;
  products: CMSProduct[] | null;
  productCategories: CMSProductCategory[] | null;
  productDetails: Record<string, CMSProduct>;
  blogs: CMSBlogPost[] | null;
  blogPosts: Record<string, CMSBlogPost>;
  events: CMSEventItem[] | null;
  offices: OfficeLocation[] | null;
}

interface CMSStoreActions {
  fetchPage: (slug: string) => Promise<any>;
  fetchNavLinks: () => Promise<NavLink[] | null>;
  fetchGlobalSEO: () => Promise<GlobalSEO | null>;
  fetchProducts: (categorySlug?: string) => Promise<{ products: CMSProduct[]; categories: CMSProductCategory[] } | null>;
  fetchProductBySlug: (slug: string) => Promise<CMSProduct | null>;
  fetchBlogs: () => Promise<CMSBlogPost[]>;
  fetchBlogBySlug: (slug: string) => Promise<CMSBlogPost | null>;
  fetchEvents: () => Promise<any>;
  fetchContactUs: () => Promise<{ sections: Record<string, any>; offices: OfficeLocation[] } | null>;
  submitEnquiry: (data: { name: string; email?: string; phone?: string; product?: string; message?: string }) => Promise<{ success: boolean; data?: any; error?: string }>;
  submitDistributorLead: (data: { name: string; firmName: string; email: string; phone: string; city?: string; state?: string; address?: string; businessType?: string; message?: string }) => Promise<{ success: boolean; data?: any; error?: string }>;
}

export const getApiBaseUrl = (): string => {
  if (typeof process !== "undefined" && process.env.NEXT_PUBLIC_CMS_API_URL) {
    return process.env.NEXT_PUBLIC_CMS_API_URL.replace(/\/$/, "");
  }
  return "http://localhost:3001";
};

export const useCMSStore = create<CMSStoreState & CMSStoreActions>((set, get) => ({
  pages: {},
  isLoading: {},
  errors: {},
  navLinks: null,
  globalSEO: null,
  products: null,
  productCategories: null,
  productDetails: {},
  blogs: null,
  blogPosts: {},
  events: null,
  offices: null,

  fetchPage: async (slug: string) => {
    const cachedPage = get().pages[slug];
    if (cachedPage) {
      return cachedPage;
    }

    set((state) => ({
      isLoading: { ...state.isLoading, [slug]: true },
      errors: { ...state.errors, [slug]: null },
    }));

    try {
      const baseUrl = getApiBaseUrl();
      const endpointSlug = slug.startsWith("/") ? slug.slice(1) : slug;
      const response = await fetch(`${baseUrl}/api/${endpointSlug}`, {
        next: { revalidate: 60 },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch page ${slug}: ${response.statusText}`);
      }

      const json = await response.json();
      if (!json.success || json.data === undefined) {
        throw new Error(json.error || "Invalid response format from CMS API");
      }

      const pageData = json.data;

      // Normalize pageData sections
      let normalizedData = pageData;
      if (pageData && typeof pageData === "object" && pageData.sections) {
        normalizedData = {
          ...pageData,
          ...pageData.sections,
        };
      }

      set((state) => ({
        pages: { ...state.pages, [slug]: normalizedData },
        isLoading: { ...state.isLoading, [slug]: false },
      }));

      return normalizedData;
    } catch (error: any) {
      const errorMessage = error.message || "An unexpected error occurred";
      set((state) => ({
        isLoading: { ...state.isLoading, [slug]: false },
        errors: { ...state.errors, [slug]: errorMessage },
      }));
      console.error(`Error fetching page ${slug}:`, error);
      return null;
    }
  },

  fetchNavLinks: async () => {
    const cachedLinks = get().navLinks;
    if (cachedLinks && cachedLinks.length > 0) {
      return cachedLinks;
    }

    try {
      const baseUrl = getApiBaseUrl();
      const response = await fetch(`${baseUrl}/api/nav-links`, {
        next: { revalidate: 60 },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch navigation links");
      }

      const json = await response.json();
      const rawLinks: ApiNavLink[] = json?.data;

      if (Array.isArray(rawLinks) && rawLinks.length > 0) {
        const formattedLinks: NavLink[] = rawLinks
          .filter((link) => link.parent === "-" || !link.parent)
          .sort((a, b) => (a.order ?? 0) - (b.order ?? 0) || a.label.localeCompare(b.label))
          .map((mainLink) => {
            let dropdown: NavLink[] | undefined = undefined;

            if (mainLink.type === "Dropdown") {
              dropdown = rawLinks
                .filter(
                  (child) =>
                    child.parent === mainLink.id ||
                    child.parent === mainLink.label
                )
                .sort(
                  (a, b) =>
                    (a.order ?? 0) - (b.order ?? 0) || a.label.localeCompare(b.label)
                )
                .map((child) => ({
                  title: child.label,
                  link: child.url,
                  desc: child.description || undefined,
                }));
            }

            return {
              title: mainLink.label,
              link: mainLink.url,
              desc: mainLink.description || undefined,
              type: mainLink.type,
              dropdown,
            };
          });

        set({ navLinks: formattedLinks });
        return formattedLinks;
      }
      return null;
    } catch (error) {
      console.error("Error fetching navigation links:", error);
      return null;
    }
  },

  fetchGlobalSEO: async () => {
    const cachedSEO = get().globalSEO;
    if (cachedSEO) {
      return cachedSEO;
    }

    try {
      const baseUrl = getApiBaseUrl();
      const response = await fetch(`${baseUrl}/api/seo`, {
        next: { revalidate: 60 },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch global SEO data");
      }

      const json = await response.json();
      if (json.success && json.data) {
        set({ globalSEO: json.data });
        return json.data;
      }
      return null;
    } catch (error) {
      console.error("Error fetching global SEO data:", error);
      return null;
    }
  },

  fetchProducts: async (categorySlug?: string) => {
    try {
      const baseUrl = getApiBaseUrl();
      const isFiltered = Boolean(categorySlug && categorySlug !== "all");
      const url = isFiltered
        ? `${baseUrl}/api/products?category=${encodeURIComponent(categorySlug!)}`
        : `${baseUrl}/api/products`;

      const response = await fetch(url, {
        next: { revalidate: 60 },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const json = await response.json();
      if (json.success && json.data) {
        const { products: fetchedProducts, categories } = json.data;

        set((state) => {
          let updatedProducts = state.products;

          if (Array.isArray(fetchedProducts)) {
            if (isFiltered && Array.isArray(state.products) && state.products.length > 0) {
              // Merge products without losing other categories
              const productMap = new Map(state.products.map((p) => [p.id || p.slug, p]));
              fetchedProducts.forEach((p) => productMap.set(p.id || p.slug, p));
              updatedProducts = Array.from(productMap.values());
            } else {
              updatedProducts = fetchedProducts;
            }
          }

          return {
            products: updatedProducts,
            productCategories: Array.isArray(categories) && categories.length > 0 ? categories : state.productCategories,
          };
        });

        return json.data;
      }
      return null;
    } catch (error) {
      console.error("Error fetching products:", error);
      return null;
    }
  },

  fetchProductBySlug: async (slug: string) => {
    const cached = get().productDetails[slug];
    if (cached) return cached;

    try {
      const baseUrl = getApiBaseUrl();
      const response = await fetch(`${baseUrl}/api/products?slug=${encodeURIComponent(slug)}`, {
        next: { revalidate: 60 },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch product ${slug}`);
      }

      const json = await response.json();
      if (json.success && json.data) {
        set((state) => ({
          productDetails: { ...state.productDetails, [slug]: json.data },
        }));
        return json.data;
      }
      return null;
    } catch (error) {
      console.error(`Error fetching product by slug ${slug}:`, error);
      return null;
    }
  },

  fetchBlogs: async () => {
    const cachedBlogs = get().blogs;
    if (cachedBlogs && cachedBlogs.length > 0) {
      return cachedBlogs;
    }

    try {
      const baseUrl = getApiBaseUrl();
      const response = await fetch(`${baseUrl}/api/blogs`, {
        next: { revalidate: 60 },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch blogs");
      }

      const json = await response.json();
      if (json.success && json.data) {
        const blogsList = Array.isArray(json.data.blogs)
          ? json.data.blogs
          : Array.isArray(json.data)
          ? json.data
          : [];

        if (json.data.sections) {
          set((state) => ({
            pages: { ...state.pages, blogs: { ...state.pages["blogs"], ...json.data.sections } },
            blogs: blogsList,
          }));
        } else {
          set({ blogs: blogsList });
        }

        return blogsList;
      }
      return [];
    } catch (error) {
      console.error("Error fetching blogs:", error);
      return [];
    }
  },

  fetchBlogBySlug: async (slug: string) => {
    const cachedBlog = get().blogPosts[slug];
    if (cachedBlog) {
      return cachedBlog;
    }

    try {
      const baseUrl = getApiBaseUrl();
      const response = await fetch(`${baseUrl}/api/blogs?slug=${encodeURIComponent(slug)}`, {
        next: { revalidate: 60 },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch blog post: ${slug}`);
      }

      const json = await response.json();
      if (json.success && json.data) {
        set((state) => ({
          blogPosts: { ...state.blogPosts, [slug]: json.data },
        }));
        return json.data;
      }
      return null;
    } catch (error) {
      console.error(`Error fetching blog post ${slug}:`, error);
      return null;
    }
  },

  fetchEvents: async () => {
    const cachedEvents = get().events;
    if (cachedEvents && cachedEvents.length > 0) {
      return cachedEvents;
    }

    try {
      const baseUrl = getApiBaseUrl();
      const response = await fetch(`${baseUrl}/api/events`, {
        next: { revalidate: 60 },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch events");
      }

      const json = await response.json();
      if (json.success && json.data) {
        const eventData = json.data;
        if (Array.isArray(eventData)) {
          set({ events: eventData });
        } else if (typeof eventData === "object") {
          set((state) => ({
            pages: { ...state.pages, events: eventData },
          }));
        }
        return eventData;
      }
      return null;
    } catch (error) {
      console.error("Error fetching events:", error);
      return null;
    }
  },

  fetchContactUs: async () => {
    try {
      const baseUrl = getApiBaseUrl();
      const response = await fetch(`${baseUrl}/api/contact-us`, {
        next: { revalidate: 60 },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch contact us data");
      }

      const json = await response.json();
      if (json.success && json.data) {
        const { sections, offices } = json.data;
        set((state) => ({
          pages: { ...state.pages, "contact-us": sections || {} },
          offices: offices || [],
        }));
        return json.data;
      }
      return null;
    } catch (error) {
      console.error("Error fetching contact-us:", error);
      return null;
    }
  },

  submitEnquiry: async (data) => {
    try {
      const baseUrl = getApiBaseUrl();
      const response = await fetch(`${baseUrl}/api/enquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          email: data.email || "noemail@provided.com",
        }),
      });

      const json = await response.json();
      return { success: json.success ?? response.ok, data: json.data, error: json.error };
    } catch (error: any) {
      console.error("Error submitting enquiry:", error);
      return { success: false, error: error.message || "Failed to submit enquiry" };
    }
  },

  submitDistributorLead: async (data) => {
    try {
      const baseUrl = getApiBaseUrl();
      const response = await fetch(`${baseUrl}/api/distributor-leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await response.json();
      return { success: json.success ?? response.ok, data: json.data, error: json.error };
    } catch (error: any) {
      console.error("Error submitting distributor lead:", error);
      return { success: false, error: error.message || "Failed to submit application" };
    }
  },
}));
