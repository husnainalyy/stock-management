"use client"; 
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { getSession, useSession } from 'next-auth/react';
import Header from '@/components/Header';
import HeroSection from '@/components/Hero';
import { useSearchParams } from 'next/navigation';

export default function Dashboard() {
    const router = useRouter();
    useEffect(() => {
        async function checkSession() {
            const session = await getSession();
            if (!session) {
                router.push('/');
            }
        }
        checkSession();
    }, [router]);

    

    interface Product {
        _id: string; // Changed to _id to match backend
        name: string;
        category: string;
        price: number;
        quantity: number;
    }

    const [products, setProducts] = useState<Product[]>([]);
    const [newProductName, setNewProductName] = useState('');
    const [newProductCategory, setNewProductCategory] = useState('');
    const [newProductPrice, setNewProductPrice] = useState('');
    const [newProductQuantity, setNewProductQuantity] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('/api/products/${id}');

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const result = await response.json();
                setProducts(result);
            } catch (error) {
                setError('Failed to fetch products.');
            }
        };

        fetchProducts();
    }, []);

    const handleAddOrUpdateProduct = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!newProductName || !newProductCategory || !(newProductPrice) || !(newProductQuantity)) {
            setError('Please fill in all fields correctly.');
            return;
        }

        try {
            const response = await fetch(selectedProduct ? `/api/products/${selectedProduct._id}` : '/api/products/${id}', {
                method: selectedProduct ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: newProductName,
                    category: newProductCategory,
                    price: parseFloat(newProductPrice),
                    quantity: parseInt(newProductQuantity, 10),
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            setSuccessMessage(selectedProduct ? 'Product updated successfully!' : 'Product added successfully!');

            // Clear form and update local state
            if (selectedProduct) {
                setProducts(products.map(product =>
                    product._id === selectedProduct._id
                        ? { ...product, name: newProductName, category: newProductCategory, price: parseFloat(newProductPrice), quantity: parseInt(newProductQuantity, 10) }
                        : product
                ));
                setSelectedProduct(null);
            } else {
                setProducts([...products, {
                    _id: '', // New products will not have an ID initially
                    name: newProductName,
                    category: newProductCategory,
                    price: parseFloat(newProductPrice),
                    quantity: parseInt(newProductQuantity, 10),
                }]);
            }
            setNewProductName('');
            setNewProductCategory('');
            setNewProductPrice('');
            setNewProductQuantity('');
            setError('');
        } catch (error) {
            setError(selectedProduct ? 'Failed to update product.' : 'Failed to add product.');
        }
    };

    const handleDeleteProduct = async (id: string) => {
        try {
            const response = await fetch(`/api/products/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            setSuccessMessage('Product deleted successfully!');
            setProducts(products.filter(product => product._id !== id));
        } catch (error) {
            setError('Failed to delete product.');
        }
    };
    
    const handleEditProduct = (product: Product) => {
        setSelectedProduct(product);
        setNewProductName(product.name);
        setNewProductCategory(product.category);
        setNewProductPrice(product.price.toString());
        setNewProductQuantity(product.quantity.toString());
    };

    const filteredProducts = products.filter(
        (product) =>
            (product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.category.toLowerCase().includes(searchTerm.toLowerCase())) &&
            (selectedCategory === 'All' || product.category === selectedCategory)
    );

    const uniqueCategories = Array.from(new Set(products.map(product => product.category)));

    
    
    return (
        <>
            <HeroSection/>
            <div className="container mx-auto p-6">
                <h1 className="text-4xl font-bold mb-4">Stock Manager</h1>
                <h1 className="text-2xl font-bold mb-4">{selectedProduct ? 'Update Product' : 'Add Product'}</h1>

                {error && <div className="text-red-500 mb-4">{error}</div>}
                {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}

                <form onSubmit={handleAddOrUpdateProduct} className="mb-6">
                    <input
                        type="text"
                        placeholder="Product Name"
                        value={newProductName}
                        onChange={(e) => setNewProductName(e.target.value)}
                        className="border rounded p-2 mr-2"
                    />
                    <input
                        type="text"
                        placeholder="Product Category"
                        value={newProductCategory}
                        onChange={(e) => setNewProductCategory(e.target.value)}
                        className="border rounded p-2 mr-2"
                    />
                    <input
                        type="number"
                        placeholder="Price"
                        value={newProductPrice}
                        onChange={(e) => setNewProductPrice(e.target.value)}
                        className="border rounded p-2 mr-2"
                        step="0.01"
                    />
                    <input
                        type="number"
                        placeholder="Quantity"
                        value={newProductQuantity}
                        onChange={(e) => setNewProductQuantity(e.target.value)}
                        className="border rounded p-2 mr-2"
                        step="1"
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 text-white p-2 rounded"
                    >
                        {selectedProduct ? 'Update Product' : 'Add Product'}
                    </button>
                </form>

                <div className="mb-6">
                    <h1 className="text-2xl font-bold mb-4">Search Product</h1>
                    <input
                        type="text"
                        placeholder="Search by name"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="border rounded p-2 mr-2"
                    />
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="border rounded p-2"
                    >
                        <option value="All">All Categories</option>
                        {uniqueCategories.map((category, index) => (
                            <option key={index} value={category}>{category}</option>
                        ))}
                    </select>
                </div>

                <div className="p-4">
                    <h2 className="text-xl font-semibold mb-4">All Products</h2>
                    {filteredProducts.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredProducts.map((product) => (
                                        <tr key={product._id}>
                                            <td className="px-4 py-2 text-sm font-medium text-gray-900">{product.name}</td>
                                            <td className="px-4 py-2 text-sm text-gray-500">{product.category}</td>
                                            <td className="px-4 py-2 text-sm text-gray-500">${product.price.toFixed(2)}</td>
                                            <td className="px-4 py-2 text-sm text-gray-500">{product.quantity}</td>
                                            <td className="px-4 py-2 text-sm text-gray-500">
                                                <button
                                                    onClick={() => handleEditProduct(product)}
                                                    className="text-blue-500 hover:underline mr-2"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteProduct(product._id)}
                                                    className="text-red-500 hover:underline"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p>No products found.</p>
                    )}
                </div>

            </div>
        </>
    );
}
