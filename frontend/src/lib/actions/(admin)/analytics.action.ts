'use server'

import { getAnalyticsOverview, getRecentOrders, getRevenueData, getTopProducts, getTopSellers } from "@/lib/api/(admin)/analytics";



export async function handleGetAnalyticsOverview() {
  try {
    const result = await getAnalyticsOverview();
    if (result.success) {
      return {
        success: true,
        message: 'Analytics overview fetched successfully',
        data: result.data
      };
    }
    return { success: false, message: result.message || 'Failed to fetch analytics overview' };
  } catch (error: Error | any) {
    return { success: false, message: error.message };
  }
}

export async function handleGetRevenueData(startDate: string, endDate: string) {
  try {
    const result = await getRevenueData(startDate, endDate);
    if (result.success) {
      return {
        success: true,
        message: 'Revenue data fetched successfully',
        data: result.data
      };
    }
    return { success: false, message: result.message || 'Failed to fetch revenue data' };
  } catch (error: Error | any) {
    return { success: false, message: error.message };
  }
}

export async function handleGetTopProducts(limit: number = 5) {
  try {
    const result = await getTopProducts(limit);
    if (result.success) {
      return {
        success: true,
        message: 'Top products fetched successfully',
        data: result.data
      };
    }
    return { success: false, message: result.message || 'Failed to fetch top products' };
  } catch (error: Error | any) {
    return { success: false, message: error.message };
  }
}

export async function handleGetRecentOrders(limit: number = 10) {
  try {
    const result = await getRecentOrders(limit);
    if (result.success) {
      return {
        success: true,
        message: 'Recent orders fetched successfully',
        data: result.data
      };
    }
    return { success: false, message: result.message || 'Failed to fetch recent orders' };
  } catch (error: Error | any) {
    return { success: false, message: error.message };
  }
}

export async function handleGetTopSellers(limit: number = 5) {
  try {
    const result = await getTopSellers(limit);
    if (result.success) {
      return {
        success: true,
        message: 'Top sellers fetched successfully',
        data: result.data
      };
    }
    return { success: false, message: result.message || 'Failed to fetch top sellers' };
  } catch (error: Error | any) {
    return { success: false, message: error.message };
  }
}
