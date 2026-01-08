import React, { SVGAttributes } from 'react';
import { Briefcase } from 'lucide-react';

export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
    return (
        <div className="bg-blue-600 p-1.5 rounded-lg">
            <Briefcase className="w-5 h-5 text-white" />
        </div>
    );
}
