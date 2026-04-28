'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { 
  CreditCard, 
  Download, 
  RefreshCw, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  XCircle,
  Filter,
  Search,
  Calendar,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

interface Payment {
  id: string;
  amount: number;
  currency: string;
  status: 'succeeded' | 'pending' | 'failed' | 'refunded';
  description: string;
  created: string;
  paymentMethod: string;
  receiptUrl?: string;
  customerEmail: string;
  customerName: string;
}

const mockPayments: Payment[] = [
  {
    id: 'pi_3abc123def456',
    amount: 4900,
    currency: 'usd',
    status: 'succeeded',
    description: 'Professional Plan - Monthly',
    created: '2026-04-14T10:30:00Z',
    paymentMethod: 'card',
    receiptUrl: 'https://receipt.stripe.com/abc123',
    customerEmail: 'user@example.com',
    customerName: 'John Doe'
  },
  {
    id: 'pi_4def456ghi789',
    amount: 900,
    currency: 'usd',
    status: 'succeeded',
    description: 'Starter Plan - Monthly',
    created: '2026-03-15T14:20:00Z',
    paymentMethod: 'alipay',
    receiptUrl: 'https://receipt.stripe.com/def456',
    customerEmail: 'user@example.com',
    customerName: 'John Doe'
  },
  {
    id: 'pi_5ghi789jkl012',
    amount: 19900,
    currency: 'usd',
    status: 'pending',
    description: 'Enterprise Plan - Monthly',
    created: '2026-04-14T09:15:00Z',
    paymentMethod: 'wechat',
    customerEmail: 'user@example.com',
    customerName: 'John Doe'
  },
  {
    id: 'pi_6jkl012mno345',
    amount: 4900,
    currency: 'usd',
    status: 'failed',
    description: 'Professional Plan - Monthly',
    created: '2026-02-10T16:45:00Z',
    paymentMethod: 'card',
    customerEmail: 'user@example.com',
    customerName: 'John Doe'
  },
  {
    id: 'pi_7mno345pqr678',
    amount: 4900,
    currency: 'usd',
    status: 'refunded',
    description: 'Professional Plan - Monthly',
    created: '2026-01-05T11:30:00Z',
    paymentMethod: 'card',
    receiptUrl: 'https://receipt.stripe.com/mno345',
    customerEmail: 'user@example.com',
    customerName: 'John Doe'
  }
];

export default function PaymentHistory() {
  const t = useTranslations('payments');
  const [payments, setPayments] = useState<Payment[]>(mockPayments);
  const [filteredPayments, setFilteredPayments] = useState<Payment[]>(mockPayments);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('all');

  // 过滤支付记录
  useEffect(() => {
    let filtered = payments;

    // 搜索过滤
    if (searchTerm) {
      filtered = filtered.filter(payment => 
        payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.customerEmail.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // 状态过滤
    if (statusFilter !== 'all') {
      filtered = filtered.filter(payment => payment.status === statusFilter);
    }

    // 日期过滤
    if (dateFilter !== 'all') {
      const now = new Date();
      const filterDate = new Date();
      
      switch (dateFilter) {
        case '7days':
          filterDate.setDate(now.getDate() - 7);
          break;
        case '30days':
          filterDate.setDate(now.getDate() - 30);
          break;
        case '90days':
          filterDate.setDate(now.getDate() - 90);
          break;
        case 'year':
          filterDate.setFullYear(now.getFullYear() - 1);
          break;
      }

      filtered = filtered.filter(payment => 
        new Date(payment.created) >= filterDate
      );
    }

    setFilteredPayments(filtered);
  }, [payments, searchTerm, statusFilter, dateFilter]);

  // 刷新支付记录
  const refreshPayments = async () => {
    setIsLoading(true);
    try {
      // 模拟 API 调用
      await new Promise(resolve => setTimeout(resolve, 1000));
      // 这里应该调用实际的 API
      // const response = await fetch('/api/payments');
      // const data = await response.json();
      // setPayments(data);
    } catch (error) {
      console.error('Failed to refresh payments:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 下载收据
  const downloadReceipt = (payment: Payment) => {
    if (payment.receiptUrl) {
      window.open(payment.receiptUrl, '_blank');
    }
  };

  // 获取状态图标
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'succeeded':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-600" />;
      case 'refunded':
        return <RefreshCw className="w-4 h-4 text-blue-600" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  // 获取状态颜色
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'succeeded':
        return 'text-green-600 bg-green-100';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'failed':
        return 'text-red-600 bg-red-100';
      case 'refunded':
        return 'text-blue-600 bg-blue-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  // 获取支付方式图标
  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case 'card':
        return <CreditCard className="w-4 h-4" />;
      case 'alipay':
        return <span className="text-sm">🔵</span>;
      case 'wechat':
        return <span className="text-sm">🟢</span>;
      default:
        return <CreditCard className="w-4 h-4" />;
    }
  };

  // 格式化金额
  const formatAmount = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(amount / 100);
  };

  // 格式化日期
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // 计算统计信息
  const stats = {
    total: payments.length,
    succeeded: payments.filter(p => p.status === 'succeeded').length,
    totalAmount: payments
      .filter(p => p.status === 'succeeded')
      .reduce((sum, p) => sum + p.amount, 0),
    refunded: payments.filter(p => p.status === 'refunded').length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 头部 */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <CreditCard className="w-8 h-8 text-primary-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  {t('title') || 'Payment History'}
                </h1>
                <p className="text-sm text-gray-600">
                  {t('subtitle') || 'View and manage your payment records'}
                </p>
              </div>
            </div>
            <button
              onClick={refreshPayments}
              disabled={isLoading}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              {t('refresh') || 'Refresh'}
            </button>
          </div>
        </div>
      </header>

      {/* 主内容 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 统计卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary-100 rounded-lg">
                <DollarSign className="w-5 h-5 text-primary-600" />
              </div>
              <div>
                <div className="text-sm text-gray-600">{t('totalSpent') || 'Total Spent'}</div>
                <div className="text-xl font-bold text-gray-900">
                  {formatAmount(stats.totalAmount, 'usd')}
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <div className="text-sm text-gray-600">{t('successful') || 'Successful'}</div>
                <div className="text-xl font-bold text-gray-900">{stats.succeeded}</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <RefreshCw className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="text-sm text-gray-600">{t('refunded') || 'Refunded'}</div>
                <div className="text-xl font-bold text-gray-900">{stats.refunded}</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 rounded-lg">
                <CreditCard className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <div className="text-sm text-gray-600">{t('totalPayments') || 'Total Payments'}</div>
                <div className="text-xl font-bold text-gray-900">{stats.total}</div>
              </div>
            </div>
          </div>
        </div>

        {/* 过滤器 */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex flex-wrap items-center gap-4">
            {/* 搜索 */}
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder={t('searchPlaceholder') || 'Search payments...'}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>

            {/* 状态过滤 */}
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="all">{t('allStatus') || 'All Status'}</option>
                <option value="succeeded">{t('succeeded') || 'Succeeded'}</option>
                <option value="pending">{t('pending') || 'Pending'}</option>
                <option value="failed">{t('failed') || 'Failed'}</option>
                <option value="refunded">{t('refunded') || 'Refunded'}</option>
              </select>
            </div>

            {/* 日期过滤 */}
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="all">{t('allTime') || 'All Time'}</option>
                <option value="7days">{t('last7Days') || 'Last 7 Days'}</option>
                <option value="30days">{t('last30Days') || 'Last 30 Days'}</option>
                <option value="90days">{t('last90Days') || 'Last 90 Days'}</option>
                <option value="year">{t('lastYear') || 'Last Year'}</option>
              </select>
            </div>
          </div>
        </div>

        {/* 支付列表 */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('paymentId') || 'Payment ID'}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('description') || 'Description'}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('amount') || 'Amount'}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('status') || 'Status'}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('method') || 'Method'}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('date') || 'Date'}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('actions') || 'Actions'}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPayments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-mono text-gray-900">
                        {payment.id.substring(0, 12)}...
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{payment.description}</div>
                      <div className="text-xs text-gray-500">{payment.customerEmail}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {formatAmount(payment.amount, payment.currency)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(payment.status)}`}>
                        {getStatusIcon(payment.status)}
                        {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        {getPaymentMethodIcon(payment.paymentMethod)}
                        <span className="capitalize">{payment.paymentMethod}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {formatDate(payment.created)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {payment.receiptUrl && (
                        <button
                          onClick={() => downloadReceipt(payment)}
                          className="flex items-center gap-1 text-primary-600 hover:text-primary-700"
                        >
                          <Download className="w-4 h-4" />
                          {t('receipt') || 'Receipt'}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 空状态 */}
          {filteredPayments.length === 0 && (
            <div className="p-12 text-center">
              <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {t('noPayments') || 'No payments found'}
              </h3>
              <p className="text-gray-600">
                {t('noPaymentsDescription') || 'There are no payments matching your current filters.'}
              </p>
            </div>
          )}
        </div>

        {/* 导出按钮 */}
        <div className="mt-6 flex justify-end">
          <button className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-md font-medium hover:bg-primary-700 transition-colors">
            <Download className="w-4 h-4" />
            {t('exportCsv') || 'Export CSV'}
          </button>
        </div>
      </main>
    </div>
  );
}