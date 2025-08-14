from django.shortcuts import render
from django.http import HttpResponse
import django


def home(request):
    """Home page showcasing Django template features."""
    context = {
        'framework_name': 'Django',
        'django_version': django.VERSION[:3],  # Get version tuple
        'total_templates': 5,
        'lines_of_code': 500,
        'features_count': 10,
    }
    return render(request, 'pages/home.html', context)


def about(request):
    """About page explaining Django template system."""
    context = {
        'django_version': '.'.join(str(v) for v in django.VERSION[:3]),
        'template_count': 5,
    }
    return render(request, 'pages/about.html', context)


def portfolio(request):
    """Portfolio page demonstrating various template layouts."""
    context = {
        'project_count': 9,
    }
    return render(request, 'pages/portfolio.html', context)


def contact(request):
    """Contact page with form handling (no database persistence)."""
    context = {
        'form_submitted': False,
        'submitted_data': None,
    }
    
    if request.method == 'POST':
        # Process form data (in a real app, you'd save to database)
        submitted_data = {
            'name': request.POST.get('name', ''),
            'email': request.POST.get('email', ''),
            'subject': request.POST.get('subject', ''),
            'message': request.POST.get('message', ''),
            'newsletter': 'Yes' if request.POST.get('newsletter') else 'No',
        }
        
        context.update({
            'form_submitted': True,
            'submitted_data': submitted_data,
        })
    
    return render(request, 'pages/contact.html', context)
