import React, { useState, useEffect } from 'react';

interface Column {
  name: string;
  type: 'TEXT' | 'NUMBER' | 'BOOLEAN' | 'DATE';
}

interface Table {
  name: string;
  columns: Column[];
  data: Record<string, any>[];
}

interface Database {
  [tableName: string]: Table;
}

const MiniDB: React.FC = () => {
  const [database, setDatabase] = useState<Database>({});
  const [selectedTable, setSelectedTable] = useState<string>('');
  const [showCreateTable, setShowCreateTable] = useState(false);
  const [showAddColumn, setShowAddColumn] = useState(false);
  const [showAddRow, setShowAddRow] = useState(false);
  const [editingRow, setEditingRow] = useState<number | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Form states
  const [newTableName, setNewTableName] = useState('');
  const [newColumnName, setNewColumnName] = useState('');
  const [newColumnType, setNewColumnType] = useState<Column['type']>('TEXT');
  const [newRowData, setNewRowData] = useState<Record<string, any>>({});

  // Load database from localStorage on component mount
  useEffect(() => {
    const savedDB = localStorage.getItem('miniDB');
    if (savedDB) {
      try {
        const parsedDB = JSON.parse(savedDB);
        setDatabase(parsedDB);
      } catch (error) {
        console.error('Error parsing saved database:', error);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save database to localStorage whenever it changes (but not on initial load)
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('miniDB', JSON.stringify(database));
    }
  }, [database, isLoaded]);

  const createTable = () => {
    if (!newTableName.trim()) return;
    
    setDatabase(prev => ({
      ...prev,
      [newTableName]: {
        name: newTableName,
        columns: [],
        data: []
      }
    }));
    
    setNewTableName('');
    setShowCreateTable(false);
  };

  const deleteTable = (tableName: string) => {
    if (window.confirm(`Are you sure you want to delete table "${tableName}"?`)) {
      setDatabase(prev => {
        const newDB = { ...prev };
        delete newDB[tableName];
        return newDB;
      });
      if (selectedTable === tableName) {
        setSelectedTable('');
      }
    }
  };

  const addColumn = () => {
    if (!newColumnName.trim() || !selectedTable) return;
    
    setDatabase(prev => ({
      ...prev,
      [selectedTable]: {
        ...prev[selectedTable],
        columns: [...prev[selectedTable].columns, { name: newColumnName, type: newColumnType }]
      }
    }));
    
    setNewColumnName('');
    setNewColumnType('TEXT');
    setShowAddColumn(false);
  };

  const addRow = () => {
    if (!selectedTable) return;
    
    setDatabase(prev => ({
      ...prev,
      [selectedTable]: {
        ...prev[selectedTable],
        data: [...prev[selectedTable].data, { ...newRowData, id: Date.now() }]
      }
    }));
    
    setNewRowData({});
    setShowAddRow(false);
  };

  const updateRow = (index: number, updatedData: Record<string, any>) => {
    if (!selectedTable) return;
    
    setDatabase(prev => ({
      ...prev,
      [selectedTable]: {
        ...prev[selectedTable],
        data: prev[selectedTable].data.map((row, i) => i === index ? updatedData : row)
      }
    }));
    
    setEditingRow(null);
  };

  const deleteRow = (index: number) => {
    if (!selectedTable) return;
    
    if (window.confirm('Are you sure you want to delete this row?')) {
      setDatabase(prev => ({
        ...prev,
        [selectedTable]: {
          ...prev[selectedTable],
          data: prev[selectedTable].data.filter((_, i) => i !== index)
        }
      }));
    }
  };

  const renderValue = (value: any, type: Column['type']) => {
    switch (type) {
      case 'BOOLEAN':
        return value ? 'true' : 'false';
      case 'DATE':
        return value ? new Date(value).toLocaleDateString() : '';
      default:
        return value?.toString() || '';
    }
  };

  const currentTable = selectedTable ? database[selectedTable] : null;

  return (
    <div className="min-h-screen bg-[var(--color-primary-light)] p-5">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-3 text-[var(--color-primary)]">
          MiniDB - Local Database Management
        </h1>
        <p className="text-lg text-gray-600">
          Create tables, manage columns, and perform CRUD operations using browser localStorage
        </p>
      </div>

      <div className="flex gap-5 max-w-7xl mx-auto">
        {/* Sidebar - Tables List */}
        <div className="w-80 bg-white rounded-xl shadow-md p-5 relative">
          <div className="absolute -top-2 -left-2 w-8 h-8 bg-[var(--color-primary)] rounded-lg"></div>
          
          <div className="flex justify-between items-center mb-5 pb-4 border-b-2 border-gray-100">
            <h3 className="text-xl font-semibold text-gray-800">Tables</h3>
            <button 
              className="bg-[var(--color-primary)] text-white py-2 px-4 rounded-lg hover:bg-[var(--color-primary-hover)] transition-colors text-sm font-medium"
              onClick={() => setShowCreateTable(true)}
            >
              + New Table
            </button>
          </div>
          
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {Object.keys(database).length === 0 ? (
              <p className="text-center text-gray-500 py-8 italic">No tables created yet</p>
            ) : (
              Object.keys(database).map(tableName => (
                <div 
                  key={tableName}
                  className={`flex justify-between items-center p-3 rounded-lg cursor-pointer transition-all border-2 ${
                    selectedTable === tableName 
                      ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)]' 
                      : 'bg-[var(--color-primary-light)] border-transparent hover:bg-gray-100'
                  }`}
                >
                  <span 
                    onClick={() => setSelectedTable(tableName)}
                    className="font-medium flex-1"
                  >
                    {tableName}
                  </span>
                  <button 
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-lg font-bold transition-colors ${
                      selectedTable === tableName
                        ? 'text-white hover:bg-white/20'
                        : 'text-red-500 hover:bg-red-500 hover:text-white'
                    }`}
                    onClick={() => deleteTable(tableName)}
                  >
                    ×
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-white rounded-xl shadow-md p-5 relative">
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-[var(--color-primary)] rounded-lg"></div>
          
          {!selectedTable ? (
            <div className="flex items-center justify-center h-96 text-center">
              <div>
                <h3 className="text-xl text-gray-500 mb-2">Select a table or create a new one to get started</h3>
                <p className="text-gray-400">Your database management workspace will appear here</p>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-center mb-5 pb-4 border-b-2 border-gray-100">
                <h2 className="text-2xl font-bold text-gray-800">{currentTable?.name}</h2>
                <div className="flex gap-3">
                  <button 
                    className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors font-medium"
                    onClick={() => setShowAddColumn(true)}
                  >
                    Add Column
                  </button>
                  {currentTable?.columns && currentTable.columns.length > 0 && (
                    <button 
                      className="bg-[var(--color-primary)] text-white py-2 px-4 rounded-lg hover:bg-[var(--color-primary-hover)] transition-colors font-medium"
                      onClick={() => setShowAddRow(true)}
                    >
                      Add Row
                    </button>
                  )}
                </div>
              </div>

              {/* Table Structure */}
              {currentTable?.columns.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-gray-500 text-lg italic">No columns defined. Add columns to start storing data.</p>
                </div>
              ) : (
                <div className="overflow-auto max-h-96 border border-gray-200 rounded-lg">
                  <table className="w-full border-collapse bg-white">
                    <thead>
                      <tr className="bg-[var(--color-primary)] text-white">
                        {currentTable?.columns.map(column => (
                          <th key={column.name} className="p-3 text-left font-semibold sticky top-0">
                            {column.name}
                            <span className="text-sm opacity-80 font-normal ml-1">({column.type})</span>
                          </th>
                        ))}
                        <th className="p-3 text-center font-semibold sticky top-0 w-36">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentTable?.data.length === 0 ? (
                        <tr>
                          <td colSpan={currentTable.columns.length + 1} className="p-8 text-center text-gray-500 italic">
                            No data available
                          </td>
                        </tr>
                      ) : (
                        currentTable?.data.map((row, index) => (
                          <tr key={index} className="hover:bg-[var(--color-primary-light)] transition-colors border-b border-gray-100">
                            {currentTable.columns.map(column => (
                              <td key={column.name} className="p-3">
                                {editingRow === index ? (
                                  <input
                                    type={column.type === 'NUMBER' ? 'number' : 
                                          column.type === 'DATE' ? 'date' : 
                                          column.type === 'BOOLEAN' ? 'checkbox' : 'text'}
                                    value={column.type === 'BOOLEAN' ? undefined : row[column.name] || ''}
                                    checked={column.type === 'BOOLEAN' ? !!row[column.name] : undefined}
                                    onChange={(e) => {
                                      const value = column.type === 'BOOLEAN' ? e.target.checked :
                                                   column.type === 'NUMBER' ? Number(e.target.value) :
                                                   e.target.value;
                                      updateRow(index, { ...row, [column.name]: value });
                                    }}
                                    className={column.type === 'BOOLEAN' 
                                      ? 'w-4 h-4' 
                                      : 'w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent'
                                    }
                                  />
                                ) : (
                                  renderValue(row[column.name], column.type)
                                )}
                              </td>
                            ))}
                            <td className="p-3 text-center">
                              {editingRow === index ? (
                                <button 
                                  className="bg-green-500 text-white py-1 px-3 rounded text-sm hover:bg-green-600 transition-colors"
                                  onClick={() => setEditingRow(null)}
                                >
                                  Save
                                </button>
                              ) : (
                                <div className="space-x-2">
                                  <button 
                                    className="bg-gray-500 text-white py-1 px-3 rounded text-sm hover:bg-gray-600 transition-colors"
                                    onClick={() => setEditingRow(index)}
                                  >
                                    Edit
                                  </button>
                                  <button 
                                    className="bg-red-500 text-white py-1 px-3 rounded text-sm hover:bg-red-600 transition-colors"
                                    onClick={() => deleteRow(index)}
                                  >
                                    Delete
                                  </button>
                                </div>
                              )}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {showCreateTable && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-xl min-w-96 max-w-lg relative">
            <div className="absolute -top-2 -left-2 w-6 h-6 bg-[var(--color-primary)] rounded-lg"></div>
            <h3 className="text-xl font-bold mb-5 text-gray-800">Create New Table</h3>
            <input
              type="text"
              placeholder="Table name"
              value={newTableName}
              onChange={(e) => setNewTableName(e.target.value)}
              className="w-full p-3 border-2 border-gray-300 rounded-lg text-base transition-all focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent mb-5"
              onKeyDown={(e) => e.key === 'Enter' && createTable()}
            />
            <div className="flex gap-3 justify-end">
              <button 
                className="bg-gray-500 text-white py-2 px-5 rounded-lg hover:bg-gray-600 transition-colors"
                onClick={() => setShowCreateTable(false)}
              >
                Cancel
              </button>
              <button 
                className="bg-[var(--color-primary)] text-white py-2 px-5 rounded-lg hover:bg-[var(--color-primary-hover)] transition-colors"
                onClick={createTable}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {showAddColumn && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-xl min-w-96 max-w-lg relative">
            <div className="absolute -top-2 -left-2 w-6 h-6 bg-[var(--color-primary)] rounded-lg"></div>
            <h3 className="text-xl font-bold mb-5 text-gray-800">Add Column to {selectedTable}</h3>
            <input
              type="text"
              placeholder="Column name"
              value={newColumnName}
              onChange={(e) => setNewColumnName(e.target.value)}
              className="w-full p-3 border-2 border-gray-300 rounded-lg text-base transition-all focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent mb-4"
            />
            <select
              value={newColumnType}
              onChange={(e) => setNewColumnType(e.target.value as Column['type'])}
              className="w-full p-3 border-2 border-gray-300 rounded-lg text-base transition-all focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent mb-5"
            >
              <option value="TEXT">Text</option>
              <option value="NUMBER">Number</option>
              <option value="BOOLEAN">Boolean</option>
              <option value="DATE">Date</option>
            </select>
            <div className="flex gap-3 justify-end">
              <button 
                className="bg-gray-500 text-white py-2 px-5 rounded-lg hover:bg-gray-600 transition-colors"
                onClick={() => setShowAddColumn(false)}
              >
                Cancel
              </button>
              <button 
                className="bg-[var(--color-primary)] text-white py-2 px-5 rounded-lg hover:bg-[var(--color-primary-hover)] transition-colors"
                onClick={addColumn}
              >
                Add Column
              </button>
            </div>
          </div>
        </div>
      )}

      {showAddRow && currentTable && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-xl min-w-96 max-w-lg relative">
            <div className="absolute -top-2 -left-2 w-6 h-6 bg-[var(--color-primary)] rounded-lg"></div>
            <h3 className="text-xl font-bold mb-5 text-gray-800">Add Row to {selectedTable}</h3>
            <div className="space-y-4 max-h-64 overflow-y-auto">
              {currentTable.columns.map(column => (
                <div key={column.name}>
                  <label className="block mb-2 font-medium text-gray-700">
                    {column.name} ({column.type})
                  </label>
                  <input
                    type={column.type === 'NUMBER' ? 'number' : 
                          column.type === 'DATE' ? 'date' : 
                          column.type === 'BOOLEAN' ? 'checkbox' : 'text'}
                    placeholder={`Enter ${column.name}`}
                    value={column.type === 'BOOLEAN' ? undefined : newRowData[column.name] || ''}
                    checked={column.type === 'BOOLEAN' ? !!newRowData[column.name] : undefined}
                    onChange={(e) => {
                      const value = column.type === 'BOOLEAN' ? e.target.checked :
                                   column.type === 'NUMBER' ? Number(e.target.value) :
                                   e.target.value;
                      setNewRowData(prev => ({ ...prev, [column.name]: value }));
                    }}
                    className={column.type === 'BOOLEAN' 
                      ? 'w-5 h-5' 
                      : 'w-full p-3 border-2 border-gray-300 rounded-lg text-base transition-all focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent'
                    }
                  />
                </div>
              ))}
            </div>
            <div className="flex gap-3 justify-end mt-6">
              <button 
                className="bg-gray-500 text-white py-2 px-5 rounded-lg hover:bg-gray-600 transition-colors"
                onClick={() => setShowAddRow(false)}
              >
                Cancel
              </button>
              <button 
                className="bg-[var(--color-primary)] text-white py-2 px-5 rounded-lg hover:bg-[var(--color-primary-hover)] transition-colors"
                onClick={addRow}
              >
                Add Row
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MiniDB;
