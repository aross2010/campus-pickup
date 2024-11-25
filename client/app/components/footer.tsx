import React from 'react'

export default function Footer() {
    return (
        <div className="fixed left-0 bottom-0 w-full bg-black py-4">
          <div className="flex justify-between items-center px-6 text-sm text-gray-400">
            <div className="grid grid-rows-2 gap-1">
              <div>Website created by</div>
              <div className="flex gap-4">
                <div>Alex Ross</div>
                <div>Noah Scheuerman</div>
                <div>Phuong Tong</div>
                <div>Mohammed Rahman</div>
              </div>
            </div>
    
            {/* Right Section */}
            <div className="text-right">
              <div>2024 © Campus Pickup</div>
              <div>With San Jose State University</div>
            </div>
          </div>
        </div>
      );
    }
    