#pragma once
#include <string>
#include <functional>

namespace Algs {
    template <typename T>
    struct Node {
        T data;
        Node *left = nullptr;
        Node *right = nullptr;
        int count = 1;

        Node(T data) : data(data) {};

        void inorder(std::function<void(const Node<T>* const)> fn) {
            if (this->left != nullptr) {
                this->left->inorder(fn);
            }

            for (int i = 0; i < count; i++) {
                fn(this);
            }

            if (this->right != nullptr) {
                this->right->inorder(fn);
            }
        }

        void preorder(std::function<void(const Node<T>* const)> fn) {
            for (int i = 0; i < count; i++) {
                fn(this);
            }

            if (this->left != nullptr) {
                this->left->preorder(fn);
            }


            if (this->right != nullptr) {
                this->right->preorder(fn);
            }
        }
    };

    template <class T>
    class BST {
    private:
        int size = 0;

        // Returns the node to replace the deleted node.
        // Key should be guaranteed to exist when this function is called
        Node<T>* m_remove(Node<T>* node, T data) {
            if (node == nullptr) {
                return nullptr;
            }

            if (data < node->data) {
                node->left = m_remove(node->left, data);
            }
            else if (data > node->data) {
                node->right = m_remove(node->right, data);
            }
            else {
                // We found our key! (Which should be guaranteed to exist when this function is called)

                // If we just removed a duplicate, we don't really have any work to do!
                if (node->count >= 2) {
                    node->count--;
                    this->size--;
                    return node;
                }

                // Otherwise, we have some node cleanup...

                // In the case of a leaf node
                if (node->left == nullptr && node->right == nullptr) {
                    delete node;
                    this->size--;
                    return nullptr;
                }
                
                // Case of 2 children
                else if (node->left != nullptr && node->right != nullptr) {
                    Node<T>* successor = node->left;
                    while (successor->right != nullptr) {
                        successor = successor->right;
                    }

                    // Swap the successor and the found value
                    const T tmpdata = node->data;
                    const int tmpcount = node->count;
                    node->data = successor->data;
                    node->count = successor->count;
                    successor->data = tmpdata;
                    successor->count = tmpcount;

                    // Remove the successor we swapped with
                    node->left = m_remove(node->left, data);
                    return node;
                }

                // Case of 1 child
                else {
                    Node<T> *newNode = node->left != nullptr ? node->left : node->right;
                    delete node;
                    this->size--;
                    return newNode;
                }
            }

            return node;
        }

        Node<T>* m_lowerBound(Node<T>* node, T data) {
            if (node == nullptr) {
                return nullptr;
            }


            // No children
            if (node->left == nullptr && node->right == nullptr) {
                if (node->data >= data) {
                    return node;
                }
                return nullptr;
            } 

            // Only left child
            else if (node->left != nullptr && node->right == nullptr) {
                if (node->data >= data) {
                    Node<T>* lb = m_lowerBound(node->left, data);
                    if (lb == nullptr) {
                        return node;
                    }
                    return lb;
                }

                return nullptr;
            } 
            
            // Only right child
            else if (node->right != nullptr && node->left == nullptr) {
                if (node->data >= data) {
                    return node;
                }

                return m_lowerBound(node->right, data);
            }

            // Both children
            else {
                if (node->data >= data) {
                    Node<T>* lb = m_lowerBound(node->left, data);
                    if (lb == nullptr) {
                        return node;
                    }
                    return lb;
                }

                return m_lowerBound(node->right, data);
            }
            // if (node == nullptr) {
            //     return nullptr;
            // }   

            // if (data == node->data) {
            //     return node;
            // }

            // else if (data < node->data) {
            //     Node<T>* lb = m_lowerBound(node->left, data);
            //     if (lb == nullptr) {
            //         return node;
            //     }

            //     return lb;
            // }
            // else {
            //     return m_lowerBound(node->right, data);
            // }
        }  
    public:
        Node<T> *root = nullptr;

        BST() {}

        BST(T data): root(new Node<T>{data}){};

        void insert(T data) {
            if (this->root == nullptr) {
                this->root = new Node<T>(data);
                this->size++;
                return;
            }

            Node<T> *current = this->root;
            while (true) {
                if (data < current->data) {
                    if (current->left == nullptr) {
                        current->left = new Node<T>(data);
                        this->size++;
                        return;
                    }

                    current = current->left;
                }
                else if (data > current->data) {
                    if (current->right == nullptr) {
                        current->right = new Node<T>(data);
                        this->size++;
                        return;
                    }

                    current = current->right;
                }
                else {
                    current->count++;
                    this->size++;
                    return;
                }
            }
        }

        bool remove(T data) {
            if (!this->find(data)) {
                return false;
            }

            this->root = this->m_remove(this->root, data);
            return true;
        }

        bool find(T data) {
            Node<T> *current = this->root;
            while (current != nullptr) {
                if (data < current->data) {
                    current = current->left;
                }
                else if (data > current->data) {
                    current = current->right;
                }
                else {
                    return true;
                }
            }
            return false;
        }

        const Node<T>* const max() {
            Node<T> *current = this->root;
            while (current != nullptr) {
                if (current->right == nullptr) {
                    return current;
                }
                current = current->right;
            }
            return nullptr;
        }

        const Node<T>* const min() {
            Node<T> *current = this->root;
            while (current != nullptr) {
                if (current->left == nullptr) {
                    return current;
                }
                current = current->left;
            }
            return nullptr;
        }
        
        const Node<T>* const lowerBound(T data) {
            return this->m_lowerBound(this->root, data);
        }

        std::string toString() const {
            if (this->root == nullptr) {
                return "";
            }

            std::stringstream ss;
            this->root->preorder([&ss](const Node<T>* const node) -> void {
                ss << node->data << "->";
            });

            const std::string str = ss.str();
            if (str.size() == 0) {
                return "";
            }

            return str.substr(0, str.size() - 2);
        }
    };
}