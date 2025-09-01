import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Plus, Trash2 } from 'lucide-react';

export function CompanyProfile() {
  const [companyData, setCompanyData] = useState({
    name: 'TechCorp Solutions',
    locations: ['New York, NY', 'San Francisco, CA'],
    contacts: [
      { type: 'Email', value: 'contact@techcorp.com' },
      { type: 'Phone', value: '+1 (555) 123-4567' }
    ],
    description: 'Leading technology solutions provider specializing in enterprise software development and digital transformation.',
    offerings: ['Software Development', 'Cloud Solutions', 'Data Analytics', 'Digital Transformation']
  });

  const [newLocation, setNewLocation] = useState('');
  const [newContact, setNewContact] = useState({ type: '', value: '' });
  const [newOffering, setNewOffering] = useState('');

  const addLocation = () => {
    if (newLocation.trim()) {
      setCompanyData(prev => ({
        ...prev,
        locations: [...prev.locations, newLocation.trim()]
      }));
      setNewLocation('');
    }
  };

  const removeLocation = (index) => {
    setCompanyData(prev => ({
      ...prev,
      locations: prev.locations.filter((_, i) => i !== index)
    }));
  };

  const addContact = () => {
    if (newContact.type.trim() && newContact.value.trim()) {
      setCompanyData(prev => ({
        ...prev,
        contacts: [...prev.contacts, { ...newContact }]
      }));
      setNewContact({ type: '', value: '' });
    }
  };

  const removeContact = (index) => {
    setCompanyData(prev => ({
      ...prev,
      contacts: prev.contacts.filter((_, i) => i !== index)
    }));
  };

  const addOffering = () => {
    if (newOffering.trim()) {
      setCompanyData(prev => ({
        ...prev,
        offerings: [...prev.offerings, newOffering.trim()]
      }));
      setNewOffering('');
    }
  };

  const removeOffering = (index) => {
    setCompanyData(prev => ({
      ...prev,
      offerings: prev.offerings.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-white text-2xl mb-2">Company Profile</h1>
        <p className="text-slate-400">Manage your company information and details</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Information */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-slate-300">Company Name</Label>
              <Input
                value={companyData.name}
                onChange={(e) => setCompanyData(prev => ({ ...prev, name: e.target.value }))}
                className="bg-slate-700 border-slate-600 text-white mt-1"
              />
            </div>
            
            <div>
              <Label className="text-slate-300">Company Description (Bio)</Label>
              <Textarea
                value={companyData.description}
                onChange={(e) => setCompanyData(prev => ({ ...prev, description: e.target.value }))}
                className="bg-slate-700 border-slate-600 text-white mt-1 min-h-24"
                placeholder="Describe your company..."
              />
            </div>
          </CardContent>
        </Card>

        {/* Locations */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Locations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              {companyData.locations.map((location, index) => (
                <div key={index} className="flex items-center justify-between bg-slate-700 p-3 rounded">
                  <span className="text-white">{location}</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => removeLocation(index)}
                    className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
            
            <div className="flex gap-2">
              <Input
                value={newLocation}
                onChange={(e) => setNewLocation(e.target.value)}
                placeholder="Add new location..."
                className="bg-slate-700 border-slate-600 text-white"
                onKeyPress={(e) => e.key === 'Enter' && addLocation()}
              />
              <Button onClick={addLocation} size="sm" className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Contacts */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              {companyData.contacts.map((contact, index) => (
                <div key={index} className="flex items-center justify-between bg-slate-700 p-3 rounded">
                  <div>
                    <Badge variant="secondary" className="bg-slate-600 text-slate-200 mb-1">
                      {contact.type}
                    </Badge>
                    <p className="text-white">{contact.value}</p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => removeContact(index)}
                    className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
            
            <div className="space-y-2">
              <div className="flex gap-2">
                <Input
                  value={newContact.type}
                  onChange={(e) => setNewContact(prev => ({ ...prev, type: e.target.value }))}
                  placeholder="Contact type (Email, Phone, etc.)"
                  className="bg-slate-700 border-slate-600 text-white"
                />
                <Input
                  value={newContact.value}
                  onChange={(e) => setNewContact(prev => ({ ...prev, value: e.target.value }))}
                  placeholder="Contact value"
                  className="bg-slate-700 border-slate-600 text-white"
                />
                <Button onClick={addContact} size="sm" className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* What We Offer */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">What We Offer</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {companyData.offerings.map((offering, index) => (
                <Badge key={index} className="bg-blue-600 text-white pr-1">
                  {offering}
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => removeOffering(index)}
                    className="ml-1 h-auto p-0 hover:bg-blue-700"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </Badge>
              ))}
            </div>
            
            <div className="flex gap-2">
              <Input
                value={newOffering}
                onChange={(e) => setNewOffering(e.target.value)}
                placeholder="Add new offering..."
                className="bg-slate-700 border-slate-600 text-white"
                onKeyPress={(e) => e.key === 'Enter' && addOffering()}
              />
              <Button onClick={addOffering} size="sm" className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end gap-3">
        <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
          Cancel
        </Button>
        <Button className="bg-blue-600 hover:bg-blue-700">
          Save Changes
        </Button>
      </div>
    </div>
  );
}