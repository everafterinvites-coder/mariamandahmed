import React from 'react';

interface ShopCatalogProps {
  onSelectTemplate: (templateId: string) => void;
}

export default function ShopCatalog({ onSelectTemplate }: ShopCatalogProps) {
  // A temporary list of your invitation designs
  const templates = [
    {
      id: 'chateau',
      title: 'The Classic Chateau',
      description: 'Elegant, romantic, featuring a beautiful castle garden backdrop.',
      image: 'https://github.com/everafterinvites-coder/mariamandahmed/blob/main/background.jpg?raw=true',
    },
    {
      id: 'placeholder2',
      title: 'Coming Soon',
      description: 'Your next beautiful interactive digital design.',
      image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=600&auto=format&fit=crop', // A nice wedding ring placeholder photo
    }
  ];

  const handleOrderClick = (e: React.MouseEvent, templateTitle: string) => {
    e.stopPropagation(); // Prevents opening the demo when clicking the order button
    
    // Placeholder message link. When you make your Instagram, we will change this!
    const placeholderMessageUrl = 'https://instagram.com'; 
    window.open(placeholderMessageUrl, '_blank');
  };

  return (
    <div className="w-full min-h-screen bg-stone-950 text-stone-100 p-8 flex flex-col items-center">
      {/* Brand Header */}
      <header className="text-center my-12">
        <h1 className="text-4xl md:text-5xl font-serif tracking-widest text-amber-100 uppercase mb-3">
          Ever After Invites
        </h1>
        <p className="text-stone-400 italic font-light tracking-wide text-sm md:text-base">
          Interactive digital wedding invitations designed to enchant your guests
        </p>
        <div className="w-24 h-[1px] bg-amber-200/40 mx-auto mt-6"></div>
      </header>

      {/* Grid of Templates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full px-4">
        {templates.map((template) => (
          <div 
            key={template.id}
            onClick={() => template.id === 'chateau' && onSelectTemplate(template.id)}
            className={`bg-stone-900 border border-stone-800/60 rounded-xl overflow-hidden shadow-xl transition-all duration-300 ${
              template.id === 'chateau' ? 'cursor-pointer hover:border-amber-200/40 hover:-translate-y-1' : 'opacity-60'
            }`}
          >
            {/* Template Card Image Frame */}
            <div className="relative aspect-[16/10] bg-stone-950 overflow-hidden">
              <img 
                src={template.image} 
                alt={template.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-transparent opacity-60"></div>
            </div>

            {/* Template Info Card */}
            <div className="p-6">
              <h2 className="text-xl font-serif tracking-wide text-stone-200 mb-2">
                {template.title}
              </h2>
              <p className="text-stone-400 text-sm font-light leading-relaxed mb-6">
                {template.description}
              </p>

              {/* Interaction Buttons */}
              <div className="flex gap-3">
                {template.id === 'chateau' ? (
                  <>
                    <button className="flex-1 py-2.5 px-4 bg-transparent border border-stone-700 hover:border-stone-400 hover:bg-stone-800 text-stone-300 text-xs tracking-wider uppercase rounded-lg transition-all duration-200">
                      View Demo
                    </button>
                    <button 
                      onClick={(e) => handleOrderClick(e, template.title)}
                      className="flex-1 py-2.5 px-4 bg-gradient-to-r from-amber-200/90 to-amber-300 text-stone-900 font-medium text-xs tracking-wider uppercase rounded-lg shadow-md hover:brightness-105 transition-all duration-200"
                    >
                      Order Now
                    </button>
                  </>
                ) : (
                  <button disabled className="w-full py-2.5 px-4 bg-stone-800/40 text-stone-600 text-xs tracking-wider uppercase rounded-lg">
                    New Style Arriving Soon
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
