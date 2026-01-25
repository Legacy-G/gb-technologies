from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from .forms import LoginForm, RegisterForm
from django.contrib import messages
from django.contrib.auth import authenticate, login  # Make sure these are imported
from django.utils.text import capfirst
from django.contrib.auth.models import User
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from .forms import EditProfileForm
from .models import UserProfile


# webint/web/views.py

# Set landing.html as the default landing page
def landing(request):
    return render(request, 'landing.html')

def index(request):
    return render(request, 'index.html')

def user_login(request):
    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            identifier = form.cleaned_data['identifier']
            password = form.cleaned_data['password']

            # Try authenticating with username first
            user = authenticate(request, username=identifier, password=password)

            if user is None:
                # Try authenticating with email
                try:
                    username_from_email = User.objects.get(email=identifier).username
                    user = authenticate(request, username=username_from_email, password=password)
                except User.DoesNotExist:
                    pass

            if user is not None:
                login(request, user)
                return redirect('index')
            else:
                return render(request, 'login.html', {'form': form, 'error': 'Invalid login credentials'})
    else:
        form = LoginForm()
    return render(request, 'login.html', {'form': form})

def user_logout(request):
    logout(request)
    return redirect('landing')  # Redirect to the landing page after logout


def register(request):
    if request.method == 'POST':
        form = RegisterForm(request.POST)
        if form.is_valid():
            first_name = capfirst(form.cleaned_data['first_name'].strip())
            email = form.cleaned_data['email'].strip()
            phone = form.cleaned_data['phone_number'].strip()

            # Username will be first name in your setup
            if User.objects.filter(username=first_name).exists():
                messages.error(request, "This username already exists.")
            elif User.objects.filter(email=email).exists():
                messages.error(request, "This email is already registered.")
            elif UserProfile.objects.filter(phone_number=phone).exists():
                messages.error(request, "This phone number is already associated with an account.")
            else:
                user = User(
                    username=first_name,
                    first_name=first_name,
                    last_name=capfirst(form.cleaned_data['surname'].strip()),
                    email=email,
                )
                user.set_password(form.cleaned_data['password'])
                user.save()

                # Save phone number in related profile model
                UserProfile.objects.create(user=user, phone_number=phone)

                authenticated_user = authenticate(username=first_name, password=form.cleaned_data['password'])
                if authenticated_user:
                    login(request, authenticated_user)
                    messages.success(request, "Registration successful!")
                    return redirect('index')
    else:
        form = RegisterForm()

    return render(request, 'register.html', {'form': form})


@login_required
def profile_view(request):
    from .models import UserProfile  # import safely inside function
    profile, created = UserProfile.objects.get_or_create(user=request.user)
    return render(request, 'profile.html', {'profile': profile})


@login_required
def edit_profile(request):
    user = request.user
    profile, created = UserProfile.objects.get_or_create(user=user)

    if request.method == 'POST':
        form = EditProfileForm(request.POST, request.FILES, instance=profile)
        if form.is_valid():
            form.save()
            user.first_name = form.cleaned_data['first_name']
            user.last_name = form.cleaned_data['last_name']
            user.email = form.cleaned_data['email']
            user.save()
            messages.success(request, "Profile updated successfully!")
            return redirect('view_profile')
    else:
        form = EditProfileForm(instance=profile, initial={
            'first_name': user.first_name,
            'last_name': user.last_name,
            'email': user.email,
        })

    return render(request, 'edit_profile.html', {'form': form})


